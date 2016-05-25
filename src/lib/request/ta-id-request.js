import ClientRequest from "./client-request";

export default class TAIDRequest extends ClientRequest {

  /**
   * @method withID
   * @param {array} numeric TA location IDs
   * @return {TAIDRequest}
   * @required
   */
  withIDs(ids) {
    this.ids = ids;
    return this;
  }

  createRequest() {
    if (!this.locale) {
      throw new Error("locale must be set");
    }

    if (!(this.ids instanceof Array)) {
      throw new Error("ids must be set");
    }

    return `${encodeURIComponent(this.locale)}/ids/ta/${this.ids.map(encodeURIComponent).join(",")}?compound=${this.compound ? 1 : 0}`;
  }
}
