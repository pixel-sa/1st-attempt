package pixel

import javax.annotation.security.PermitAll

@PermitAll
class ApplicationController {

    def vehicleService

    def index() {}

//  -----  ajax requests  ---------

    def getMakes(){
        ServiceResponse serviceResponse = vehicleService.getMakes(params)
        if(serviceResponse.isSuccessful()) {
            render(contentType: "application/json") {
                [result: true, data: serviceResponse.result]
            }
        }else {
            render(contentType: "application/json") {
                [result: false, errors: serviceResponse.errors]
            }
        }

    }

    def getModels(){
        ServiceResponse serviceResponse = vehicleService.getModels(params)
        if(serviceResponse.isSuccessful()) {
            render(contentType: "application/json") {
                [result: true, data: serviceResponse.result]
            }
        }else {
            render(contentType: "application/json") {
                [result: false, errors: serviceResponse.errors]
            }
        }
    }

    def getEngines(){
        ServiceResponse serviceResponse = vehicleService.getEngines(params)
        if(serviceResponse.isSuccessful()) {
            render(contentType: "application/json") {
                [result: true, data: serviceResponse.result]
            }
        }else {
            render(contentType: "application/json") {
                [result: false, errors: serviceResponse.errors]
            }
        }
    }

}


