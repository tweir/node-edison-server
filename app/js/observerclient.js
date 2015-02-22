define(["util","eddy"],function (util,eddy) {
    var eddyRepo = {};
    var oc = {};

    function updateClientStatus(e){
      /*var divSelector = '#client-'+e.id;
      if ($(divSelector).length == 0){
        $('#eddyclients').append("<div id='client-"+e.id+"'><div>Id:<span>"+e.id+"</span></div><div>Status:<span class='clientstatus'></span></div>");
      } 
      $(divSelector + ' .clientstatus').text(e.status);*/
      //eddy.setStatus(e.sta)
    }

    function connectClient(data){
      var id = data.id;
      var e = eddy.create(id,data.name);
      e.status = 'connected';
      eddyRepo[id]=e;
      e.ensureView();
    }

    function disconnectClient(data){
      var id = data.id;
      e = eddyRepo[id];
      e.setStatus('disconnected')
    }

    return {
        setup: function () {
          console.log("Ready (in OC)");
          oc.socket = io(); 
          oc.socket.on('connect', function () { 
            console.log("Connected");
            oc.socket.emit('init',{clientType:'web',id:util.guid()});
          });
          oc.socket.on('eddy_connected', function(data) {
            console.log("Eddy connected");
            console.log(data);
            connectClient(data);
          });
          oc.socket.on('eddy_disconnected', function(data) {
            console.log("Eddy disconnected");
            console.log(data);
            disconnectClient(data);
          });
          oc.socket.on('eddy_data',function(data) {
            console.log("Eddy data");
            console.log(data);
          });
          oc.socket.on()
        }
    };
});