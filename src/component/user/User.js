import React from 'react';
import { Button, Header, Icon } from "semantic-ui-react";
import './user.css';

export function UserProfile({ details, onBackClick }) {
    return (
        <div className="user-detail-container">
            <Header size='large'>User Details</Header>
            <Header as='h4'>
                <Header.Content>
                    UserName
                <Header.Subheader>{details.username}</Header.Subheader>
                </Header.Content>
            </Header>
            <Header as='h4'>
                <Header.Content>
                    FullName
                <Header.Subheader>{details.name}</Header.Subheader>
                </Header.Content>
            </Header>
            <Header as='h4'>
                <Header.Content>
                    Email
                <Header.Subheader>{details.email}</Header.Subheader>
                </Header.Content>
            </Header>
            <Header as='h4'>
                <Header.Content>
                    WebSite
                <Header.Subheader>
                        <a href={`https://www.${details.website}`} target='_blank' rel='noreferrer'>{details.website}</a>
                    </Header.Subheader>
                </Header.Content>
            </Header>
            <Header as='h4'>
                <Header.Content>
                    Company Details
                <Header.Subheader>
                        <Header as='h5' className="sub-header">
                            <Header.Content>
                                Company Name
                             <Header.Subheader>
                                    {details.company.name}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Header as='h5' className="sub-header">
                            <Header.Content>
                                Company CatchPhrase
                             <Header.Subheader>
                                    {details.company.catchPhrase}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Header as='h5' className="sub-header">
                            <Header.Content>
                                Company Bs
                             <Header.Subheader>
                                    {details.company.bs}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Header.Subheader>
                </Header.Content>
            </Header>
            <Button basic animated onClick={e => onBackClick()}>
                <Button.Content visible>Back</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow left' />
                </Button.Content>
            </Button>
        </div>
    )
}