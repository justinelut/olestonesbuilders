import React from 'react'

export default function Logo() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <img style={{ width: '70px', height: '70px', marginBottom: '10px' }} src="/images/favicon.png" alt="Logo" />
            <div style={{marginTop: '10px' }}>OLESTONES ADMIN</div>
        </div>

    )
}