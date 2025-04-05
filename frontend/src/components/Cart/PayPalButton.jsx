import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaypalButton = (amount, onSuccess, onError) => {
    return <PayPalScriptProvider options={{ "client-id": "Adu0p2I239MK74Igc3mVw4gdLNDWLZmrbCJ66F_y4AEJShjycvei0RBSFXrXPCRXyxU8sM8RrNLmFhsz" }}>

    <PayPalButtons style={{layout: "vertical"}} createOrder={(dagta, actions) => {
        return actions.order.create({
            purchase_units: [{amount: {value: amount}}],
        })
    }}
    onApprove={(data, actions) => {
        return actions.order.capture().then(onSuccess) 
    }}
        onError={onError} />           
    </PayPalScriptProvider>
}

export default PaypalButton
