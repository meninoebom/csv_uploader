function parseCustomerData(customerData){
  var dataArray = customerData.trim().split('\r\n').slice(1);
  var result = dataArray.map(function(item){
    var customer = {};
    var fields = item.split(',');
    if(fields.length < 2) throw new Error('Incorrectly formatted CSV');
    if(fields[0] || fields[1]) {      
      customer.name = fields[0];
      customer.email = fields[1];
      return customer;
    }

  });
  return result;
}

exports.parseCustomerData = parseCustomerData;