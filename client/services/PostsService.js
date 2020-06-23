import Api from "../services/api";

export default {
  fetchPosts() {
    return Api().get("posts");
  },

  addPost(params) {
    return Api().post("posts", params);
  }
};
