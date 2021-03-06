// Generated by CoffeeScript 1.3.3
(function() {
  var WheresTheBeef,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WheresTheBeef = (function() {

    WheresTheBeef.prototype.body_height = 0;

    WheresTheBeef.prototype.dom_modify_timeout = null;

    WheresTheBeef.prototype.comments = null;

    function WheresTheBeef() {
      this.dom_modified = __bind(this.dom_modified, this);

      this.handle_resize_check = __bind(this.handle_resize_check, this);

      this.setup = __bind(this.setup, this);
      document.addEventListener('DOMContentLoaded', this.setup, false);
    }

    WheresTheBeef.prototype.setup = function() {
      if (this.find_the_filler()) {
        this.show_the_beef();
      }
      return document.addEventListener('DOMSubtreeModified', this.dom_modified, false);
    };

    WheresTheBeef.prototype.find_the_filler = function() {
      var element, elementList, _i, _len;
      elementList = document.querySelectorAll(window.filler_selector_list.join(', '));
      for (_i = 0, _len = elementList.length; _i < _len; _i++) {
        element = elementList[_i];
        element.depth = this._node_depth(element);
        if (!this.comments || element.depth < this.comments.depth) {
          this.comments = element;
        }
      }
      return this.comments;
    };

    WheresTheBeef.prototype.show_the_beef = function() {
      var end, ratio, start;
      this.body_height = document.body.clientHeight;
      ratio = window.innerHeight / this.body_height;
      start = Math.ceil(ratio * this.comments.offsetTop);
      end = window.innerHeight - start;
      if (!this.display) {
        this.build_the_beef();
      }
      this.filler.style.top = "" + start + "px";
      return this.filler.style.height = "" + end + "px";
    };

    WheresTheBeef.prototype.build_the_beef = function() {
      this.beef = document.createElement('div');
      this.beef.className = "howlong-container";
      this.filler = document.createElement('div');
      this.filler.className = "howlong-comments";
      this.beef.appendChild(this.filler);
      return document.body.appendChild(this.beef);
    };

    WheresTheBeef.prototype.handle_resize_check = function() {
      if (document.body.clientHeight !== this.body_height) {
        return this.show_the_beef();
      }
    };

    WheresTheBeef.prototype.dom_modified = function() {
      if (this.dommodify_timeout) {
        window.clearTimeout(this.dommodify_timeout);
      }
      return this.dommodify_timeout = window.setTimeout(this.handle_resize_check, 500);
    };

    WheresTheBeef.prototype._node_depth = function(element) {
      if (element.parentNode) {
        return 1 + this._node_depth(element.parentNode);
      } else {
        return 0;
      }
    };

    return WheresTheBeef;

  })();

  new WheresTheBeef();

}).call(this);
