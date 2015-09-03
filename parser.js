function parseCustomerData(customerData){
  var result = [];

  for(var i = 0; i < customerData.length; i++){
    var fields = customerData[i].split(',');
    var customer = {}
    if(fields.length !== 2) return false;
    if(fields[0] || fields[1]) {      
      customer.name = fields[0];
      customer.email = fields[1];
      result.push(customer);
    }
  }
  console.log('result of parsing', result);
  return result;
}

exports.parseCustomerData = parseCustomerData;