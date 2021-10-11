import React from 'react'
import { Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap'

const EditAddressModal = ({ closeFunc, ...props }) => {

  const formSubmitHandler = (values) => {
    console.log(values);
    if (closeFunc) {
      closeFunc();
    }
  };

  return (
    <Modal {...props}>
      <Modal.Body>
        <p className="h3 text-center mb-4">Ubah Alamat</p>
        <Formik
          initialValues={{
            full_name: '',
            phone_number: '',
            address: '',
            address_detail: ''
          }}
          onSubmit={formSubmitHandler}
        >
          <FormikForm>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="full_name" className="text-gray">Nama Lengkap Penerima</label>
              <Field component={BootstrapForm.Control} className="p-2" id="full_name" name="full_name" type="text" />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="phone_number" className="text-gray">No.HP Penerima</label>
              <Field component={BootstrapForm.Control} className="p-2" id="phone_number" name="phone_number" type="text" />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="address" className="text-gray">Alamat Penerima</label>
              <Field component={BootstrapForm.Control} className="p-2" id="address" name="address" type="text" />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="address_detail" className="text-gray">Detail Alamat</label>
              <Field as={() => <BootstrapForm.Control as="textarea" />} className="p-2" id="address_detail" name="address_detail" />
            </div>
            <Field className="btn-black w-100 py-2" type="submit" value="Simpan" />
          </FormikForm>
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default EditAddressModal
