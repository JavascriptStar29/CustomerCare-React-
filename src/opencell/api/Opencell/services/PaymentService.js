import BaseService from '../BaseService';

class PaymentService extends BaseService {

  constructor(){
    super();
    this.serviceUrl = "/api/rest/payment";
  }


  listByCustomerAccount(customerAccount) {
    let url = this.serviceUrl + '/customerPayment?customerAccountCode=' + customerAccount.code;
    return this.connector.callApi({url});
  }

}

const paymentService = new PaymentService();
export default paymentService;