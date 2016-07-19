
$(document).ready(function () {

    var current = 0;

    var character = {

        selector : {
            id: '#ryu',
            image: '#ryu > img'
        },

        normal : {
            state: "normal",
            image : "http://i.imgur.com/90Mmdcm.png"
        },

        hover : {
            state: "hover",
            image : "http://i.imgur.com/nTj3Fxx.gif"
        },

        click: {
            state: "click",
            image: "http://i.imgur.com/Rfj0a80.png"
        },

        attack : {
            state: "attack",
            image: "http://i.imgur.com/oTyQRvX.gif"
        }
    }

    // append an img tag with our picture of Ryu
    // url: http://i.imgur.com/90Mmdcm.png

    function getImageTag( {state, image} ) {
        return $( "<img />", {
            "class": state,
            "src": image
        } );
    }

    function toggleImage( selector, image ) {
        console.log("Toggling Image: " + selector.id);
        $(selector.id).src = image.image;
    }

    function loadCharacter( { selector, normal } ) {
        console.log("Loading Character: " + getImageTag(normal));
        $( selector.id ).append( getImageTag(normal) );
    }


    // change the img src on hover to the animated gif of Ryu
    // url: http://i.imgur.com/nTj3Fxx.gif
    // when the user 'unhovers' change back to static Ryu
    function loadCharacterHover( { selector, normal, hover } ) {

        function addHover( replace, image ) {

            console.log("Hover ID" + replace.id);

            $(replace.id).hover(function () {
                    // over
                    console.log("Over");
                    $(replace.id).src = image.image;
                }, function () {
                    // out
                    console.log("Out");
                    $(replace.id).src = replace.image;
                }
            );
        }

        // console.log("Adding Character Hover");
        
        // addHover( normal, hover);
    }

    // when a user clicks, change Ryu's stance
    // url: http://i.imgur.com/Rfj0a80.png

    function loadCharacterClick( character ) {

        function toggleAttach( character ) {
            console.log("attacking");

        }

        function MouseDown( id ) {
            $(id + ' > img').on('mousedown', function () {
                toggleAttach();
            });
        }

        function MouseUp( id )  {
            $(id + ' > img').on('mouseup', function() {
                toggleAttach();
            })
        }

        MouseDown( character.id );
        MouseUp( character.id );

    }

    

    function load( character ) {
        loadCharacter( character );
        // loadCharacterHover( character );
        // loadCharacterClick( character )

    }

    load( character );

    // Hover Toggle
    $(character.selector.image + '.' + character.normal.state).hover(function () {
            this.src = character.hover.image;
        }, function () {
            this.src = character.normal.image;
        }
    );


    // add the Hadouken!
    // url: http://i.imgur.com/oTyQRvX.gif
    function CharacterAttack( { selector, attack } ) {


        function AddAttack( selector, attack) {
            var img = $( '<img />', { 'class': attack.state, 'src': attack.image } );
            $(character.selector.id).append(img)
        }

        function AnimateAttack( state ) {
            var move = { 'margin-left': "600px" };
    
            $('img.'+state).animate( move, 1000, function() { RemoveLast( state ) } );
        }

        function RemoveLast( state ) {
            return $("."+state)[0].remove();
        }

        function Remove( state ) {
            $("."+state).remove() 
        } 

        AddAttack( selector, attack );
        AnimateAttack( attack.state );
    }


    // animate that Hadouken
    $(character.selector.image).on( 'mousedown', function() {
        this.src = character.click.image;
        CharacterAttack( character );
    })

    // let Ryu relax
    // url: http://i.imgur.com/90Mmdcm.png
    $(character.selector.image).on( 'mouseup', function() {
        this.src = character.normal.image;
        $('#hadouken').remove();
    })


});
