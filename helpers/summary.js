exports.getSummary = async(event) => {
    try {
        const {amountData} = event;
        let sum = 0,cnt = 0;
        for(let i=0;i<amountData.length;i++) {
            const{present,amountPaid} = amountData[i];
            // console.log(present,amountPaid);
            if(present === true){
                cnt++;
                sum += parseFloat(amountPaid);
            }
        }
        if(cnt === 0)return amountData;
        const avg = sum/cnt;
        for(let i=0;i<amountData.length;i++) {
            const{present} = amountData[i];
            if(present === true){
                amountData[i].amountPaid = parseFloat(amountData[i].amountPaid) - avg;
            }
        }
        return amountData;
    } catch (error) {
        return error;
    }
}

exports.finalReport = async (data)=>{
    if(data.length <= 1)return [];
    let total = 0;
    for(let i=0;i<data.length;i++){
        data[i].amount = parseInt(data[i].amount);
        total += data[i].amount;
    } 
    data.sort(function(a,b) {
        return (parseInt(a.amount) > parseInt(b.amount)) ? 1 : (parseInt(a.amount) < parseInt(b.amount) ? -1 : 0);
    } );
    const avg = total/data.length;
    // console.log(avg);
    for(let i=0;i<data.length;i++){
        data[i].amount -= avg;
    }
    let l = 0,r = data.length-1;
    const result = [];
    while(l<r){
        let a = Math.abs(data[l].amount), b = Math.abs(data[r].amount);
        if(a == 0 || b == 0){break;}
        if(a == b){
            result.push(`${data[l].name} pays ${data[r].name} amount ${a.toFixed(1)}`);
            l++;r--;
        }else if(a<b){
            data[r].amount -= a;
            result.push(`${data[l].name} pays ${data[r].name} amount ${a.toFixed(1)}`);
            l++;
        }else{
            data[l].amount += b;
            result.push(`${data[l].name} pays ${data[r].name} amount ${b.toFixed(1)}`);
            r--;
        }
    }
    return result;
}