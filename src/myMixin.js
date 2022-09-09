export default {
    data() {
      return {
        title: 'Mixins are cool',
        copyright: 'All rights reserved. Product of super awesome people'
      };
    },
    methods: {
      greetings: function() {
        alert('Howdy my good fellow!');
      },

      array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
      },
      copyToClipboard(string) {
        // Get the text field
        //var copyText = document.getElementById("myInput");
      
        // Select the text field
        //copyText.select();
        //copyText.setSelectionRange(0, 99999); // For mobile devices
      
        // Copy the text inside the text field
        navigator.clipboard.writeText(string);
        
        // Alert the copied text
        
      }
    }
  };