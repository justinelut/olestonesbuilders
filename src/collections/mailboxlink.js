import React from 'react';
import styled from 'styled-components';

const MailboxContainer = styled.div`
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #222;
`;

const MailboxLabel = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const MailboxLink = styled.a`
  color: #555;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const MailboxIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  margin-right: 0.5rem;
`;

function OlestonesMailbox() {
    return (
        <MailboxContainer>
            <MailboxIcon viewBox="0 0 24 24">
                <path d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H2V7l8 5 8-5z" />
            </MailboxIcon>
            <MailboxLabel>Olestones Mailbox</MailboxLabel>
            <MailboxLink href="https://webmail.olestonesbuilders.co.ke/">
                View Your Mailbox
            </MailboxLink>
        </MailboxContainer>
    );
}

export default OlestonesMailbox;
