import axios, { AxiosRequestConfig } from "axios";

const BASE_URL: string =
  import.meta.env.VITE_BASE_URL || "http://localhost:3001";

// const BASE_URL: string =
//   process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** Interface for the API response */
interface ApiResponse<T> {
  [key: string]: T;
}

/** Company data type */
interface Company {
  handle: string;
  name: string;
  description: string;
  logo_url: string;
}

/** Job data type */
interface Job {
  id: number;
  title: string;
  salary: number;
  equity: string;
  company_handle: string;
}

/** User data type */
interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  is_admin: boolean;
}

/** API Class for interacting with the backend */
class JoblyApi {
  // The token for interacting with the API will be stored here.
  static token: string;

  static async request<T>(
    endpoint: string,
    data: object = {},
    method: "get" | "post" | "patch" | "delete" = "get"
  ): Promise<T> {
    console.debug("API Call:", endpoint, data, method);

    const url: string = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        params,
        headers,
      };
      const response = await axios(config);
      return response.data as T;
    } catch (err: any) {
      console.error("API Error:", err.response);
      const message: string | string[] = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get details on a company by handle. */
  static async getCompany(handle: string): Promise<Company> {
    const res = await this.request<ApiResponse<Company>>(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies with optional filters. */
  static async getCompanies(filters: object = {}): Promise<Company[]> {
    const res = await this.request<ApiResponse<Company[]>>(
      `companies`,
      filters
    );
    return res.companies;
  }

  /** Create a new company (admin only). */
  static async createCompany(companyData: Company): Promise<Company> {
    const res = await this.request<ApiResponse<Company>>(
      `companies`,
      companyData,
      "post"
    );
    return res.company;
  }

  /** Update a company by handle (admin only). */
  static async updateCompany(
    handle: string,
    updates: Partial<Company>
  ): Promise<Company> {
    const res = await this.request<ApiResponse<Company>>(
      `companies/${handle}`,
      updates,
      "patch"
    );
    return res.company;
  }

  /** Delete a company by handle (admin only). */
  static async deleteCompany(handle: string): Promise<void> {
    await this.request<void>(`companies/${handle}`, {}, "delete");
  }

  /** Get all jobs with optional filters. */
  static async getJobs(filters: object = {}): Promise<Job[]> {
    const res = await this.request<ApiResponse<Job[]>>(`jobs`, filters);
    return res.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id: number): Promise<Job> {
    const res = await this.request<ApiResponse<Job>>(`jobs/${id}`);
    return res.job;
  }

  /** Create a new job (admin only). */
  static async createJob(jobData: Partial<Job>): Promise<Job> {
    const res = await this.request<ApiResponse<Job>>(`jobs`, jobData, "post");
    return res.job;
  }

  /** Update a job by id (admin only). */
  static async updateJob(id: number, updates: Partial<Job>): Promise<Job> {
    const res = await this.request<ApiResponse<Job>>(
      `jobs/${id}`,
      updates,
      "patch"
    );
    return res.job;
  }

  /** Delete a job by id (admin only). */
  static async deleteJob(id: number): Promise<void> {
    await this.request<void>(`jobs/${id}`, {}, "delete");
  }

  /** Register a new user. */
  static async registerUser(userData: Partial<User>): Promise<string> {
    const res = await this.request<ApiResponse<string>>(
      `auth/register`,
      userData,
      "post"
    );
    return res.token;
  }

  /** Login a user. */
  static async loginUser(userData: Partial<User>): Promise<string> {
    const res = await this.request<ApiResponse<string>>(
      `auth/token`,
      userData,
      "post"
    );
    return res.token;
  }

  /** Get a user by username (admin only or same user). */
  static async getUser(username: string): Promise<User> {
    const res = await this.request<ApiResponse<User>>(`users/${username}`);
    return res.user;
  }

  /** Update a user by username (admin only or same user). */
  static async updateUser(
    username: string,
    updates: Partial<User>
  ): Promise<User> {
    const res = await this.request<ApiResponse<User>>(
      `users/${username}`,
      updates,
      "patch"
    );
    return res.user;
  }

  /** Delete a user by username (admin only or same user). */
  static async deleteUser(username: string): Promise<void> {
    await this.request<void>(`users/${username}`, {}, "delete");
  }

  /** Apply to a job for a user. */
  static async applyToJob(username: string, jobId: number): Promise<boolean> {
    const res = await this.request<ApiResponse<boolean>>(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );
    return res.applied;
  }

  /** Get the list of jobs a user has applied to. */
  static async getAppliedJobs(username: string): Promise<number[]> {
    const res = await this.request<ApiResponse<number[]>>(
      `users/${username}/jobs`,
      {},
      "get"
    );
    return res.jobs;
  }
}

// Temporary token for development
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
