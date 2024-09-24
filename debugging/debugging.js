var data = [
    {name: 'Joe', age: 20},
    {name: 'Bill', age: 30},
    {name: 'Kate', age: 23}
  ]
  
  function getNames(data){
    return data.map(function(item){return item.name});
  }

  console.log(getNames(data))