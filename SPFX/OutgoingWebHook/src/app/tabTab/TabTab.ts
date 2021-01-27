import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/tabTab/index.html")
@PreventIframe("/tabTab/config.html")
@PreventIframe("/tabTab/remove.html")
export class TabTab {
}
