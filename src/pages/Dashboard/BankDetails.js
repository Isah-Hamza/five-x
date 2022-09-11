import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const BankDetails = () => {

    useEffect(() => {
        document.getElementById('iban').addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^\dA-Z]/gi, '')
            .toUpperCase()
            .replace(/(.{4})/g, '$1 ')
            .trim();
        });
    }, [])

    return (
        <div className='container styleForm pb-3'
            data-aos="fade-right"
        >
            <h4 className="lead pb-4 fw-bold text-center  text-dark mt-2" >Please Provide Your Bank Details</h4>
            <form class="row g-3 needs-validation " novalidate>
                <div class="col-md-6">
                    <label for="validationCustom01" class="form-label text-dark ">Name of Beneficiary</label>
                    <input type="text" class="form-control" style={{ backgroundColor: "#F8F9FA" }} id="validationCustom01" required />
                    <div class="valid-feedback     ">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom02" class="form-label text-dark  ">Bank Name</label>
                    <input type="text" class="form-control" id="validationCustom02" style={{ backgroundColor: "#F8F9FA" }} required />
                    <div class="valid-feedback     ">
                        Looks good!
                    </div>
                </div>

                {/* <div class="col-md-6">
                    <label for="validationCustomUsername" class="form-label">IBAN</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend"></span>
                        <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                        <div class="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>
                </div> */}
                <div class="col-md-6">
                    <label for="iban" class="form-label  text-dark ">IBAN</label>
                    <input type="text" class="form-control" style={{ backgroundColor: "#F8F9FA" }} maxLength={22}
                     id="iban" name="iban"     required />
                    <div class="invalid-feedback     ">
                        Please provide a valid BIC.
                    </div>
                </div>


                <div class="col-md-6">
                    <label for="validationCustom03" class="form-label  text-dark ">BIC</label>
                    <input type="text" class="form-control" maxLength={11} minLength={8} id="validationCustom03" style={{ backgroundColor: "#F8F9FA" }} required />
                    <div class="invalid-feedback     ">
                        Please provide a valid BIC.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom04" class="form-label   text-dark">Bank Address</label>
                    <input class="form-control" style={{ backgroundColor: "#F8F9FA" }} type="text" id="validationCustom04" required>
                    </input>
                    <div class="invalid-feedback     ">
                        Please Check Your Bank Address.
                    </div>
                </div>
                {/* <div class="col-12">
                    <div class="form-check">
                        <input style={{ height: "1.1rem" }} class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label class="form-check-label" for="invalidCheck     ">
                            Agree to terms and conditions
                        </label>
                        <div class="invalid-feedback     ">
                            You must agree before submitting.
                        </div>
                    </div>
                </div> */}
                <div class="col-12">
                    <button class="btn btn-primary px-lg-4" type="submit">Update Bank Details</button>
                </div>
            </form>
        </div>
    );
};

export default BankDetails;