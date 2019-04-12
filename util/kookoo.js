var xml = require('xml');
//var train = require('./train.js');
function getXMLResponse(response) {
    return xml(response);
}

module.exports = {
    getXMLBody : function createResponse(req) {

        var event = req.query.event;
        var data = req.query.data || '';
        var cid = req.query.cid;
        var res;
  if(event)
  {
      if (event == 'NewCall') {
          res = {
              response:
                  [{
                      playtext: 'Welcome to I V R Application.'
                  },
                      {
                          collectdtmf: [ {
                              _attr: { t: "#"}
                          },
                              {
                                  playtext: 'If you are male press 1 or press 2 for female followed by #'
                              }
                          ]}]
          };
      }

      else if(event == 'GotDTMF') {
          var temp=req.query.sid.split('$')[1];
          if(temp || data) {
              console.log('SID:: ', req.query.sid);
              if(temp){
            var value=parseInt(temp);
                  var inp = parseInt(data);
                  if(value==1||value==2) {
                      if (inp == 1) {
                          res = {
                              response:
                                  [
                                      {
                                          playtext: 'You are an adult.'
                                      } ]
                      }
                          ;
                      }
                      else if (inp == 2) {
                          res = {
                              response:
                                  [{
                                      playtext: 'Minors are not allowed.'
                                  }]
                      }
                          ;
                      }
                  }
              }

              else
              {
                  var inp = parseInt(data);
                  if(inp==1)
                  {
                      res = {
                          response :
                              [{
                                  _attr: { sid: cid + "$" + "1"}
                              },
                                  {
                                      collectdtmf: [{
                                          _attr: { t: "#"}
                                      },
                                          {
                                              playtext: 'If you are above 21 press 1 '
                                          },
                                          {
                                              playtext: 'Or press 2 if you are below 21 followed by #'
                                          }]
                                  }]
                      };
                  }
                  else if(inp==2)
                  {
                      res = {
                          response :
                              [{
                                  _attr: { sid: cid + "$" + "2"}
                              },
                                  {
                                      collectdtmf: [{
                                          _attr: { t: "#"}
                                      },
                                          {
                                              playtext: 'If you are above 18 press 1 '
                                          },
                                          {
                                              playtext: 'Or press 2 if you are below 18 followed by #'
                                          }]
                                  }]
                      };
                  }
              }
      }
  }
  }
  else {
      res = {
          response:
              [{
                  hangup: ''
              }
              ]
      };
  }
        return getXMLResponse(res);
  }
  }