new Vue({
el: 'body',
  data: {
    url: '',
    method:'GET',
    textarea:'',
    labelType:'',
    labelMessage:'',
    animation:'',
    styleObject:{
      display: 'none',
      visibility: 'hidden'
    },
    labelStyle:{
      display: 'none',
      visibility: 'hidden'
    }
  },
  methods:{
    methodChange: function(event){

      this.labelStyle={
        display: 'none',
        visibility: 'hidden'
      };
      this.animation='';

      if(this.method=='GET'||this.method=='DELETE'){
        this.styleObject={
          display: 'none',
          visibility: 'hidden'
        };
      }
        else{
          this.styleObject={
            visibility: 'visible'
          };

      }
    },
  	send: function(){

      if((this.url.indexOf('http://'))<0){

        this.url='http://'+this.url;


      }

      this.styleObject={
        visibility: 'visible'
      };
      this.labelStyle={
        visibility: 'visible'
      };
      this.animation='';
      this.animation='animated lightSpeedIn';

          	console.log(this.url + " " + this.reqtype);

            var dat={};
            if(this.method=='GET'||this.method=='DELETE'){
              dat={};
            }
            else{
              dat=JSON.parse(this.textarea);
            }
            this.textarea='';



            this.$http({url:this.url, method:this.method, data:dat}).then(function (response) {

                this.labelType='success';
                this.labelMessage='Success!';
                // get status
                console.log("status : "+response.status);

                // get all headers
                //console.log("headers : "+response.headers());


                // get 'expires' header
                //response.headers('expires');

                // set data on vm
                console.log(response.data);

                this.$set('textarea', JSON.stringify(response.data,null, 2))

            }, function (error) {

              this.labelType='danger';
              this.labelMessage='oh snap! error('+error.status+')';
                // error callback
            }

          );

       },


  }

})
