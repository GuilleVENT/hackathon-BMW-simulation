// test speed-array 

speed_arr = [0, 
             20, 
             25, 
             35, 
             37.5, 
             30, 
             46, 
             59, 
             64, 
             44, 
             57, 
             68, 
             75, 
             55, 
             68, 
             70, 
             79, 
             88, 
             96, 
             104, 
             84.3, 
             55, 
             47, 
             45, 
             58, 
             40, 
             37, 
             23, 
             15, 
             0 
            ] 
 
//console.log(speed_arr.length) 


for (i = 0 ; i<speed_arr.length ;i++){ 
    //console.log(' - - - - - - - -'); 
    //console.log('  Time: ', i+1); 
    //console.log(' Speed: ', speed_arr[i]); 
    
    var gear 
    gear = speed2gear(speed_arr[i]); 
    
    //console.log('  Gear: ', gear) 
    

}



 
function speed2gear(speed){ 
    var gear_float = speed / 20  
    var gear_int = Math.ceil(gear_float) 
    if ( gear_int < 1 ) { 
        gear_int = 'N'; 
    } 
    if ( gear_int > 6) { 
        gear_int = 6 
    } 
    return gear_int 
} 