var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.call(this);
        this._person = new egret.Bitmap();
        this._speed = 1.5;
    }
    var d = __define,c=Person,p=c.prototype;
    p.SetState = function (e) {
        if (this._State != e) {
            this._State.onExit();
        }
        this._State = e;
        this._State.onEnter();
    };
    p.firstCreat = function () {
        this._person = this.createBitmapByName("10000_png");
        this._person.x = 0;
        this._person.y = 0;
        this.setAnchor(this._person);
        this.addChild(this._person);
        var idle = new Idle(this);
        var walk = new Walk(this);
        this._State = idle;
        idle.onEnter();
    };
    p.Creat = function () {
        var _this = this;
        var walk = new Walk(this);
        var idle = new Idle(this);
        var x;
        var y;
        this.parent.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            var dis = Math.sqrt(Math.pow((evt.stageX - _this._person.x), 2) + Math.pow((evt.stageY - _this._person.y), 2));
            var time = dis / _this._speed * 10;
            if (_this._State == walk) {
                console.log("          " + _this._State);
                egret.Tween.removeTweens(_this._person);
                egret.Tween.get(_this._person).to({ x: evt.stageX, y: evt.stageY }, time, egret.Ease.sineIn);
            }
            else {
                _this.SetState(walk);
                egret.Tween.get(_this._person).to({ x: evt.stageX, y: evt.stageY }, time, egret.Ease.sineIn);
            }
            x = evt.stageX;
            y = evt.stageY;
        }, this);
        egret.startTick(function () {
            if (_this._person.x == x && _this._person.y == y) {
                _this.SetState(idle);
            }
            return false;
        }, this);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p.setAnchor = function (e) {
        e.$setAnchorOffsetX(e.width / 2);
        e.$setAnchorOffsetY(e.height / 2);
    };
    return Person;
}(egret.DisplayObjectContainer));
egret.registerClass(Person,'Person');
//# sourceMappingURL=Person.js.map