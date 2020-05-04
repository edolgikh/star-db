import React from "react";
import { SwapiServiceConsumer } from "../swapi-service-context";
//компонент высшего порядка для ../sw-components - (85)
const withSwapiService = (mapMethodsToProps) => (Wrapped) =>{
    return (props) =>{
        return(
            <SwapiServiceConsumer>
                {
                    (swapiService) =>{
                        const serviceProps = mapMethodsToProps(swapiService);
                        return (
                            <Wrapped {...props} {...serviceProps}/>
                        )
                    }
                }
            </SwapiServiceConsumer>
        )
    }
};


export default withSwapiService;