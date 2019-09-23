function HashTable(){
    this.table = new Array(137)
    this.simpleHash  = simpleHash
    this.put = put
    this.showDistro = showDistro
    this.betterHash = betterHash
}
function  simpleHash(data){
    var total = 0;
    for(var i = 0; i<data.length; i++){
        total+=data.charCodeAt(i)
    }
    console.log('hash value--',data,'->',total)
    return total% this.table.length
}
function put(data){
    var pos = this.betterHash(data)
    this.table[pos] = data
}
function showDistro(){
    var n = 0 ;
    for(var i = 0;i<this.table.length; i++){
        if(this.table[i]!=undefined){
            console.log(i+':'+this.table[i])
        }
    }
}
function betterHash(string){
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
       total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length; 
    console.log('hash value--',string,'->',total)
    if(total<0){
       total += this.table.length-1;
    }
    
    return parseInt(total);
}
var someNames = ["David", "Jennifer", "Donnie", "Raymond","Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hTable = new HashTable()

for(var  i =0; i< someNames.length;i++){
    hTable.put(someNames[i])
}
hTable.showDistro()
//hash value-- David -> 80
// hash value-- Jennifer -> 12
// hash value-- Donnie -> 55
// hash value-- Raymond -> 22
// hash value-- Cynthia -> 103
// hash value-- Mike -> 82
// hash value-- Clayton -> 58
// hash value-- Danny -> 110
// hash value-- Jonathan -> 80
// 12:Jennifer
// 22:Raymond
// 55:Donnie
// 58:Clayton
// 80:Jonathan
// 82:Mike
// 103:Cynthia
// 110:Danny