
var app = new Vue({
  el: '#app',
  data: function() {
    return {
      show: true,
      walk: false,
      animations: [],
      type: '',
    };
  },

  created: function() {
   this.getAnimations();
 },

  methods: {
    getAnimations: function() {
        axios.get("/api/items").then(response => {
 	        this.animations = response.data;
 	        //return true;
       }).catch(err => {
       });
     },

    addAnimation: function() {
      axios.post("/api/items", {
        type: this.type,
        show: true,
        walk: false,
      }).then(response => {
        this.getAnimations();
        return true;
      }).catch(err => {
        console.log("error adding an animation")
      });
    },

    animationWalk: function(animation){
      animation.walk = !animation.walk;
      axios.put("/api/items/" + animation.id, {
        type: animation.type,
        show: animation.show,
        walk: animation.walk,
      }).then(response => {
        this.getAnimations;
        return true;
      }).catch(err => {
        console.log("Error adjusting the api to walk or not walk");
      });
    },

    deleteAnimation: function(animation) {
      axios.delete("/api/items/" + animation.id).then(response => {
	       this.getAnimations();
	        return true;
      }).catch(err => {
      });
  },
});
