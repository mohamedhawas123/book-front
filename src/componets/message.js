import React from 'react'
import { Alert } from 'react-bootstrap'



const Message = ({variantt, children}) => {

    return (
        <Alert variantt="variant">
            {children}

        </Alert>

        
    )

}

Message.defaultProps = {
    variant: 'info'
}

export default Message