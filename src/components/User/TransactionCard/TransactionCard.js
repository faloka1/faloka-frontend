import {React, useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useToggle from '../../../hooks/use-toggle';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2'

import TransactionProductCard from '../../../components/User/TransactionCard/TransactionProductCard/TransactionProductCard';
import TransactionDetailModal from '../../TransactionDetailModal/TransactionDetailModal';
import PaymentProofDropzone from '../../PaymentProofDropzone/PaymentProofDropzone';
import PaymentProofModal from '../../PaymentProofModal/PaymentProofModal';
import { ReactComponent as CalendarIcon } from '../../../components/SVG/calendar.svg';

import './TransactionCard.scss';

const TransactionCard = ({ transaction, isLoading, onUpdate }) => {
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    const [showProof, setShowProof] = useState(false);
    const handleCloseProof = () => setShowProof(false);
    const handleShowProof = () => setShowProof(true);
    const {
        toggle: dropZoneToggle,
        setToggleOn: setDropZoneOn,
        setToggleOff: setDropZoneOff
    } = useToggle();
    const [isUploaded, setIsUploaded] = useState(0);

    var transactionPrice = 0;
    var buttonCaption;
    var buttonHandler;

    if (transaction){
        if (transaction.status === "unpaid"){
            buttonCaption = "Upload Bukti Bayar"
            buttonHandler = setDropZoneOn
        }else{
            buttonCaption = "Lihat Bukti Bayar"
            buttonHandler = handleShowProof
        }
    }
   
    const uploadSuccessHandler = () => {
        setIsUploaded(1);
    };

    const uploadFailedHandler = () => {
        setIsUploaded(-1);
    };

    const updateComponent = () => {
        if (onUpdate) {
            onUpdate(transaction.id);
        }
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    if (isUploaded === 1){
        Toast.fire({
            icon: 'success',
            title: '<small class="small-toast">Bukti pembayaran berhasil di-upload.</small>'
        })
        setIsUploaded(false)
        updateComponent()
    }else if (isUploaded === -1){
        Toast.fire({
            icon: 'error',
            title: '<small class="small-toast">Bukti pembayaran gagal di-upload.</small>'
        })
        setIsUploaded(false)
    }

    return (
        <div className="transaction">
            <div className="card-transaction">
                <div className="transaction-header">
                    <div className={`header-date ${isLoading ? 'placeholder-glow' : ''}`}>
                        {isLoading ?
                            (
                                <span class="col-12 placeholder bg-secondary"></span>
                            ):(
                                <small>
                                    <CalendarIcon className="icon" />
                                    {moment(transaction.created_at).format('dddd, DD MMMM YYYY')}
                                </small>
                            )
                        }                        
                    </div>
                    <div className={`header-detail ${isLoading ? 'placeholder-glow' : ''}`}>
                        {isLoading ?
                            (<span class="col-12 placeholder bg-secondary"></span>):
                            (<Link to="#" onClick={handleShowDetail}><small>Lihat Detail Transaksi</small></Link>)
                        }  
                    </div>
                </div>
                {isLoading ? (
                    <div className="transaction-brand placeholder-glow" >
                        <div className="brand-name">
                            <small className="col-2 placeholder bg-secondary"></small>
                        </div>
                        <div className="brand-product">
                            <TransactionProductCard isLoading={isLoading}/>
                        </div>
                    </div>
                ) : (
                    transaction.order_brands.map(order_brands => {
                    transactionPrice += order_brands.shipping.shipping_price;
                    return(
                        <div className="transaction-brand" key={order_brands.id}>
                            <div className="brand-name">
                                {order_brands.brand.name}
                            </div>
                            <div className="brand-product">
                                {order_brands.order_details.map((order_details, index) => {
                                    transactionPrice += order_details.quantity * order_details.products.price;
                                    return (index < 1 ? <TransactionProductCard key={order_details.id} product={order_details}/> : null)
                                })}
                            </div>
                            {order_brands.order_details.length > 1 && (
                                <Link className="brand-more" to="#" onClick={handleShowDetail}>
                                    <small>+{order_brands.order_details.length - 1} produk lainnya</small>
                                </Link>
                            )}
                        </div>
                    )})
                )}
                <Row xs={2} lg={4} className="transaction-footer g-2">
                    <Col md={6} lg={6} className={isLoading ? 'placeholder-glow' : ''}>
                        {isLoading ?
                            (<span class="col-4 placeholder bg-secondary"></span>):
                            (<span className="total-label">Total Pembayaran</span>)
                        }  
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <div className={`transaction-price ${isLoading ? 'placeholder-glow' : ''}`}>
                            {isLoading ?
                                (<span class="col-12 placeholder bg-secondary"></span>):
                                (<CurrencyFormat value={transactionPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />)
                            }  
                        </div>
                    </Col>
                    <Col xs={12} className={`mt-3 mt-lg-2 ${isLoading ? 'placeholder-glow' : ''}`}>
                        {isLoading ?
                            (<span class="col-12 placeholder bg-primary"></span>):
                            (<Button variant={'primary'} type={'button'} className={'btn-flat'} onClick={buttonHandler}>{buttonCaption}</Button>)
                        }  
                    </Col>
                </Row>
            </div>
            {transaction && <TransactionDetailModal show={showDetail} onHide={handleCloseDetail} close={handleCloseDetail} transaction={transaction} setDropZoneOn={setDropZoneOn} showProof={handleShowProof}/>}
            {transaction && <PaymentProofModal show={showProof} onHide={handleCloseProof} close={handleCloseProof} image={transaction.image_payment_url}/>}
            {transaction && <PaymentProofDropzone show={dropZoneToggle} onSuccess={uploadSuccessHandler} onError={uploadFailedHandler} closeFunc={setDropZoneOff} onHide={setDropZoneOff} orderId={transaction.id} centered />}
        </div>
    );
};

export default TransactionCard;