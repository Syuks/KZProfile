//https://developer.valvesoftware.com/wiki/SteamID
//http://whatsmysteamid.azurewebsites.net/

//Steam64 = 76561198267993933
//Binary  = 00000001 0001 00000000000000000001 0001001001010111100011110100110 1
//          ^      ^ ^  ^ ^                  ^ ^                             ^ ^
//          |______| |__| |__________________| |_____________________________| |
//              U     AT        INSTANCE              32-BIT ACCOUNT ID        Y
//Steam32  = STEAM_1:1:153864102 -> STEAM_U:Y:32-bit
//Y is actually part of the 32 bits, it is just displayed separetly

function GetSteam64 (myInput) {

    if (isValidSteamId32(myInput)) {
        
        //will just assume universe, account type and instance as 1

        var firstHalf = "00000001000100000000000000000001";

        var steamId32Array = myInput.split(":");

        var accountIdLowBit = steamId32Array[1];

        var accountIdHighBits = parseInt(steamId32Array[2]).toString(2); //toString(2) from int to bits

        var secondHalf = accountIdHighBits.padStart(31, '0') + accountIdLowBit; //padStart makes sure we get the whole 31 bits with leading zeros

        var steamId64 = BigInt('0b' + (firstHalf + secondHalf)); //parsing the string back to a number
        
        return steamId64;
    
    } else if (isValidSteamId64(myInput)) {
        return myInput;

    } else {
        return null;
    }

}

function GetSteam32 (myInput) {
    
    if (isValidSteamId64(myInput)) {
        var steamId64 = BigInt(myInput);

        var universe = (steamId64 >> 56n) & 0xFFn;

        var accountIdLowBit = steamId64 & 1n;

        var accountIdHighBits = (steamId64 >> 1n) & 0x7FFFFFFFn;

        return("STEAM_" + universe + ":" + accountIdLowBit + ":" + accountIdHighBits);
    
    } else if (isValidSteamId32(myInput)) {
        return myInput;
    } else {
        return null;
    }

}

//from borbkz kz.gl
function isValidSteamId32(steamID) {
    return /^STEAM_[0-5]:[01]:\d+$/.test(steamID);
}

function isValidSteamId64(steamID) {
    return /^[0-9]{17}$/.test(steamID);
}

function isValidSteamProfile(steamProfile) {
    //profiles is with steam64s
    //https://steamcommunity.com/profiles/76561199039866117/
    return /https:\/\/steamcommunity\.com\/profiles\/[0-9]{17}(?:\/|)$/.test(steamProfile);
}

function isValidVanityProfile(steamProfile) {
    //id is with vanity url
    //https://steamcommunity.com/id/Syuks/
    return /https:\/\/steamcommunity\.com\/id\/\S+$/.test(steamProfile);
}

function isValidKZMap(map) {
    return /(?:bkz_|kzpro_|kz_|skz_|vnl_|xc_)\S+$/i.test(map);
}

function JumpstatColor (units) {
    switch (currentJumptype) {
      case "Longjump" :
        if ($("#crouchbindCheck").is(":checked")) {
          if (units >= 287){
            return '#d22ce5';
          } else if (units >= 285){
            return '#e4ae39';
          } else if(units >= 275){
            return '#fa292e';
          } else if (units >= 270) {
            return '#4abc8d';
          } else if (units >= 265) {
            return '#5d96d6';
          }
        } else {
          if (units >= 282){
            return '#d22ce5';
          } else if(units >= 280){
            return '#e4ae39';
          } else if (units >= 275) {
            return '#fa292e';
          } else if (units >= 270) {
            return '#4abc8d';
          } else if (units >= 265) {
            return '#5d96d6';
          }
        }
        break;
      case "Bhop" :
        if ($("#crouchbindCheck").is(":checked")) {
          if (units >= 344){
            return '#d22ce5';
          } else if (units >= 342){
            return '#e4ae39';
          } else if(units >= 330){
            return '#fa292e';
          } else if (units >= 325) {
            return '#4abc8d';
          } else if (units >= 320) {
            return '#5d96d6';
          }
        } else {
          if (units >= 342){
            return '#d22ce5';
          } else if(units >= 340){
            return '#e4ae39';
          } else if (units >= 330) {
            return '#fa292e';
          } else if (units >= 325) {
            return '#4abc8d';
          } else if (units >= 320) {
            return '#5d96d6';
          }
        }
        break;
      case "MultiBhop" :
        if ($("#crouchbindCheck").is(":checked")) {
          if (units >= 360){
            return '#d22ce5';
          } else if (units >= 358){
            return '#e4ae39';
          } else if(units >= 350){
            return '#fa292e';
          } else if (units >= 345) {
            return '#4abc8d';
          } else if (units >= 340) {
            return '#5d96d6';
          }
        } else {
          if (units >= 357){
            return '#d22ce5';
          } else if(units >= 355){
            return '#e4ae39';
          } else if (units >= 350) {
            return '#fa292e';
          } else if (units >= 345) {
            return '#4abc8d';
          } else if (units >= 340) {
            return '#5d96d6';
          }
        }
        break;
      case "Ladderjump" :
        if (units >= 200){
          return '#d22ce5';
        } else if (units >= 193){
          return '#e4ae39';
        } else if(units >= 175){
          return '#fa292e';
        } else if (units >= 165) {
          return '#4abc8d';
        } else if (units >= 155) {
          return '#5d96d6';
        }
        break;
      case "Weirdjump" :
        if ($("#crouchbindCheck").is(":checked")) {
          if (units >= 302){
            return '#d22ce5';
          } else if (units >= 300){
            return '#e4ae39';
          } else if(units >= 290){
            return '#fa292e';
          } else if (units >= 285) {
            return '#4abc8d';
          } else if (units >= 280) {
            return '#5d96d6';
          }
        } else {
          if (units >= 300){
            return '#d22ce5';
          } else if(units >= 298){
            return '#e4ae39';
          } else if (units >= 290) {
            return '#fa292e';
          } else if (units >= 285) {
            return '#4abc8d';
          } else if (units >= 280) {
            return '#5d96d6';
          }
        }
        break;
      case "DropBhop" : //kztimer dropbhop tiers are wrong. They are the same as in gokz, but i won't take away from the player the ownage they got in server.
        if (units >= 342){
          return '#d22ce5';
        } else if (units >= 340){
          return '#e4ae39';
        } else if(units >= 325){
          return '#fa292e';
        } else if (units >= 320) {
          return '#4abc8d';
        } else if (units >= 315) {
          return '#5d96d6';
        }
        break;
      case "Countjump" :  //they don't exist in gokz and almost noone jumps binded
        if (units >= 307){
          return '#d22ce5';
        } else if (units >= 305){
          return '#e4ae39';
        } else if(units >= 295){
          return '#fa292e';
        } else if (units >= 290) {
          return '#4abc8d';
        } else if (units >= 285) {
          return '#5d96d6';
        }
        break;
    }
}

function loadOpenID () {
    window.location.href =
      'https://steamcommunity.com/openid/login?' +
      'openid.ns=http://specs.openid.net/auth/2.0&' +
      'openid.mode=checkid_setup&' +
      'openid.return_to=' + window.location.protocol + '//' + window.location.host + '/extras/steam.html?login&' +
      'openid.realm=' + window.location.protocol + '//' + window.location.host + '&' +
      'openid.ns.sreg=http://openid.net/extensions/sreg/1.1&' +
      'openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&' +
      'openid.identity=http://specs.openid.net/auth/2.0/identifier_select'
    ;
}

function burr12 (x, c, d, loc, scale) {
  //shifting and scaling x accordingly
  let y = (x - loc) / scale;
  let fburr12 = ( (c * d * Math.pow(y, c - 1)) / Math.pow(1 + Math.pow(y, c), d + 1) ) / scale;
  return fburr12;
}

function burr12percentile (x, c, d, loc, scale) {
  //shifting and scaling x accordingly
  let y = (x - loc) / scale;
  let percentile = Math.pow(1 + Math.pow(y, c),-d);
  return percentile;
}

//jquery extension for cleaner radio group value retrieving
jQuery.fn.extend({
  groupVal: function() {
      return $(this).filter(':checked').val();
  }
});

function gameModeID (gameModeSelector) {
  let modeID = 200;
  switch (gameModeSelector.groupVal()) {
    case "kz_timer"  : modeID = 200;break;
    case "kz_simple" : modeID = 201;break;
    case "kz_vanilla": modeID = 202;break;
  }
  return modeID;
}
