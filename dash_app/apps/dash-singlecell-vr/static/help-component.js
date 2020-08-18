AFRAME.registerComponent('help', {
    schema: {
        show: {type: 'boolean', default: false},
    },
    init: function() {
        this.el.object3D.position.set(2.4, -.5, .2);
        this.width = 12;
        this.height = 6;
        this.el.setAttribute('width', this.width);
        this.el.setAttribute('height', this.height);
        this.el.setAttribute('visible', false);
    },
    update: function(oldData) {
        if (this.data.show) {
            document.getElementById('cursor').setAttribute('raycaster', 'objects', '#helpButton');
            this.el.setAttribute('visible', true);
            this.el.setAttribute('src', '/assets/tips_1.m4v');
            setTimeout(() => {
                this.el.setAttribute('src', '/assets/tips_2.m4v');
                setTimeout(() => {
                    this.el.setAttribute('src', '/assets/tips_3.m4v');
                    setTimeout(() => {
                        this.dismiss();
                    }, 5000)
                }, 5000);
            }, 5000);
            
        } else {
            this.dismiss();
        }
    },
    dismiss: function() {
        document.getElementById('cursor').setAttribute('raycaster', 'objects', '[gui-interactable]');
        this.el.setAttribute('visible', false);
    }

});