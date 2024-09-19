import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("dev-test")
export class DevTest extends LitElement {
    @property()
    title = "default title";

    /**
     * The number of times the button has been clicked.
     */
    @property({ type: Number })
    count = 0;

    render() {
        return html`
            <div class="container">
                <h1>Remix Test WebComponent</h1>
                <div>
                    This WebComp has
                    <ul>
                        <li>an invokable method <code>reset</code></li>
                        <li>event "current-count" which has an int payload</li>
                        <li>event "just-trigger" with no payload</li>
                    </ul>
                </div>

                <p>${this.title}</p>

                <div class="card">
                    <button @click=${this._onClick} part="button">
                        count is ${this.count}
                    </button>
                    <button @click=${this._emitCount}>Emit count</button>
                    <button @click=${this._justTrigger}>trigger only</button>
                </div>

                <h2>Below is the slotted element</h2>
                <slot></slot>
            </div>
        `;
    }

    // this can be invoked from outside
    reset() {
        this.count = 0;
    }

    private _onClick() {
        this.count++;
    }

    private _emitCount() {
        this.dispatchEvent(
            new CustomEvent("current-count", {
                detail: this.count,
                bubbles: true,
                composed: true,
            })
        );
    }
    private _justTrigger() {
        this.dispatchEvent(
            new CustomEvent("just-trigger", { bubbles: true, composed: true })
        );
    }

    static styles = css`
        :host {
            max-width: 1280px;
            padding: 1rem;
        }
        .container {
            display: flex;
            flex-direction: column;
        }

        h1 {
            font-size: 2.4em;
            line-height: 1.1;
        }

        a {
            font-weight: 500;
            color: #646cff;
            text-decoration: inherit;
        }
        a:hover {
            color: #535bf2;
        }

        button {
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            background-color: #1a1a1a;
            color: red;
            cursor: pointer;
            transition: border-color 0.25s;
        }
        button:hover {
            border-color: #646cff;
        }
        button:focus,
        button:focus-visible {
            outline: 4px auto -webkit-focus-ring-color;
        }

        @media (prefers-color-scheme: light) {
            a:hover {
                color: #747bff;
            }
            button {
                background-color: #f9f9f9;
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "dev-test": DevTest;
    }
}