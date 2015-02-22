define(function () {
    function template(id,status)
    {
      return "<div id='client-" + id + "' data-id='"+id+"'  >" +
             "<div>Id:<span>" + id + "</span></div>" +
             "<div>Status:<span class='clientstatus'>"+status+"</span></div>";
    }

    var Eddy = function(id,name){
      this.id = id;
      this.name = name;
      this.status = "disconnected";
    }

    Eddy.prototype.setStatus = function(status){
      this.status = status;      
      var divSelector = '#client-'+this.id;
      $(divSelector + ' .clientstatus').text(this.status);
    }

    Eddy.prototype.ensureView = function(){
      var divSelector = '#client-'+this.id;
      if ($(divSelector).length == 0){
        $('#eddyclients').append(template(this.id,this.status));
      } 
    }

    return {
      create: function(id,name){
        return new Eddy(id,name);
      }
    }
  }
)