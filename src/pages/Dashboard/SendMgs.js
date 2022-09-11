import React, { useContext } from 'react';
import { useRef } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import { BASE_URLContext, UsersContext, ShopProductsContext } from "../../App";


const SendMgs = () => {
    const heading = useRef("")
    const message = useRef("")

    const { baseUrl } = useContext(BASE_URLContext);

    const handleMessage = event => {
        event.preventDefault()
        const Heading = heading?.current?.value
        const Message = message?.current?.value
        const data = { Heading, Message }

        const url = `${baseUrl}/user/send-message`
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }

    return (
        <DashboardLayout>
            <h3 className='text-center'>Message</h3>
            <div className='pe-lg-3 w-75 mx-auto' style={{ marginTop: "13%" }}>

                <form onSubmit={handleMessage}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Subject</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                            ref={heading}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            ref={message}
                        />
                    </div>
                    <button type='submit' class="btn btn-secondary btn-sm px-3 py-1">Send</button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default SendMgs;