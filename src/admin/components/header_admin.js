import {CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, NavLink, Row, UncontrolledDropdown} from "reactstrap";
import React from "react";

const HeaderAdmin = () => (
    <div>
        <CardHeader>
            <Row>
                <Col>
                    <UncontrolledDropdown>
                        <DropdownToggle style={{color:"black", fontSize:"25px"}} nav caret>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                <NavLink style={{color:"black"}} href="/admin/client">Clients</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink style={{color:"black"}} href="/admin/device">Devices</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink style={{color:"black"}} href="/admin/sensor">Sensors</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Col>
                <strong style={{paddingTop:"8px", fontSize:"25px"}}>Admin</strong>
            </Row>
        </CardHeader>
    </div>
);
export default HeaderAdmin