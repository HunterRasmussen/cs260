

Vue.use(VueResource);

var app = new Vue({
  el: '#app',

  data: {
    truthNumber: '',
    dareNumber: '',
    daresFileName: "/dares.json",
    truthsFileName: "/truths.json",
    allTruthsText: "bub",
    dareObject: null,
    truthObject: null,
    truthDisplay: '',
    dareDisplay: '',



  },

  watch: {
    truthNumber: function() {
      this.displayTruth();
    },
    dareNumber: function(){
      this.displayDare();
    }

},

  created: function() {
    this.loadDares();
    this.loadTruths();
  },

  methods: {

    loadDares: function() {
          // GET /someUrl
        this.$http.get(this.daresFileName).then(response => {
          var responseBody = response.bodyText;
          this.dareObject = JSON.parse(responseBody);
        },
        response => {
          console.log("error");
          // error callback
      });
    },

    loadTruths: function() {
          // GET /someUrl
      this.$http.get(this.truthsFileName).then(response => {
        var responseBody = response.bodyText;
        this.truthObject = JSON.parse(responseBody);
      },
      response => {
        console.log("error");
          // error callback
      });
    },

    randomTruth: function() {
      var min = 0;
      var max = this.truthObject.length-1;
      var randomnumber = Math.floor(Math.random() * (max-min) + min);
      this.truthNumber = randomnumber;
    },

    randomDare: function() {
      var min = 0;
      var max = this.dareObject.length-1;
      var randomnumber = Math.floor(Math.random() * (max-min) + min);
      this.dareNumber = randomnumber;
    },

    displayTruth: function() {
      this.truthDisplay = this.truthObject[this.truthNumber].value;
    },

    displayDare: function() {
      this.dareDisplay = this.dareObject[this.dareNumber].value;
    },

 },
});
