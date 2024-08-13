import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...
  /** Get all companies with optional filters. */
  static async getCompanies(filters = {}) {
    let res = await this.request(`companies`, filters);
    return res.companies;
  }

  /** Get all jobs with optional filters. */
  static async getJobs(filters = {}) {
    let res = await this.request(`jobs`, filters);
    return res.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Register a new user. */
  static async registerUser(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  /** Login a user. */
  static async loginUser(userData) {
    let res = await this.request(`auth/token`, userData, "post");
    return res.token;
  }

  /** Get a user by username (admin only or same user). */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update a user by username (admin only or same user). */
  static async updateUser(username, updates) {
    let res = await this.request(`users/${username}`, updates, "patch");
    return res.user;
  }

  /** Apply to a job for a user. */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
