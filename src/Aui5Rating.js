import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {fetchI18nBundle, getI18nBundle} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";

import "@ui5/webcomponents-icons/dist/favorite.js";
import "@ui5/webcomponents-icons/dist/unfavorite.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
// Template
import Aui5RatingTemplate from "./generated/templates/Aui5RatingTemplate.lit.js";
// Styles
import Aui5RatingCss from "./generated/themes/Aui5Rating.css.js";

import {PLEASE_WAIT} from "./generated/i18n/i18n-defaults.js";

const metadata = {
    tag: "aui5-rating",
    properties: /** @lends sap.ui.webcomponents.main.Aui5Rating.prototype */ {
        /**
         * @type {Integer}
         * @defaultvalue 5
         * @public
         */
        stars: {
            type: Integer,
            defaultValue: 5,
        },

        /**
         * @type {Integer}
         * @defaultvalue 0
         * @public
         */
        rating: {
            type: Integer,
            defaultValue: 0,
        },

        /**
         * @private
         */
        _currentRating: {
            type: Integer,
            defaultValue: 0,
        },

        /**
         * @private
         */
        _starsState: {
            type: Object,
            multiple: true
        }
    },
    slots:  /** @lends sap.ui.webcomponents.main.Aui5Rating.prototype */  {},
    events: /** @lends sap.ui.webcomponents.main.Aui5Rating.prototype */  {
        /**
         * @event
         * @public
         */
        rated: {}
    },
};

/**
 * @constructor
 * @author Frank
 * @alias sap.ui.webcomponents.main.Aui5Rating
 * @extends UI5Element
 * @tagname aui5-rating
 * @public
 * @since 1.0.0
 */
class Aui5Rating extends UI5Element {

    constructor() {
        super();
        this.i18nBundle = getI18nBundle("@ui5/rating-indicator");
    }

    get pleaseWaitText() {
        return this.i18nBundle.getText(PLEASE_WAIT);
    }


    static get metadata() {
        return metadata;
    }

    static get render() {
        return litRender;
    }

    static get template() {
        return Aui5RatingTemplate;
    }

    static get styles() {
        return Aui5RatingCss;
    }

    static async onDefine() {
        await fetchI18nBundle("@ui5/rating-indicator");
    }

    static get dependencies() {
        return [Icon];
    }

    onEnterDOM() {
        this._currentRating = this.rating;
    }

    onBeforeRendering() {
        this._initInternalState();
    }


    _updateRating(e) {
        const value = parseInt(e.target.getAttribute('data-value'));
        if (this._currentRating !== value) {
            this._currentRating = value;
            this.fireEvent('rated', this._currentRating);
            console.log('Firing event ', this._currentRating);
        }
    }

    _initInternalState() {
        this._starsState = [];
        for (let i = 1; i < this.stars + 1; i++) {
            this._starsState.push({
                isSelected: i <= this._currentRating,
                index: i
            })
        }
    }

    _onClick(event) {
        event.stopPropagation();
        console.log('onClick: ', event);
    }
}

Aui5Rating.define();

export default Aui5Rating;
