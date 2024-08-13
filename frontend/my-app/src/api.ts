import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

interface Company {
  handle: string;
  name: string;
  description: string;
  logo_url: string;
}

interface Job {
  id: number;
  title: string;
  salary: number;
  equity: number;
  company_handle: string;
}

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
}

interface ApiResponse<T> {
  data: T;
  token?: string;
  applied?: boolean;
}

interface CompanyFilters {
  search?: string;
  name?: string;
  minEmployees?: number;
  maxEmployees?: number;
}

interface JobFilters {
  title?: string;
  minSalary?: number;
  hasEquity?: boolean;
}

interface UserData {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface JobApplicationData {
  jobId: number;
}

class JoblyApi {
  static token: string | undefined;

  static async request<T>(
    endpoint: string,
    data: object = {},
    method: "get" | "post" | "patch" = "get"
  ): Promise<ApiResponse<T>> {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("API Error:", err.response);
        const message = err.response?.data?.error?.message;
        throw Array.isArray(message) ? message : [message];
      } else {
        // Handle unexpected errors
        console.error("Unexpected Error:", err);
        throw ["An unexpected error occurred"];
      }
    }
  }

  /** Get details on a company by handle. */
  static async getCompany(handle: string): Promise<Company> {
    const res = await this.request<{ company: Company }>(`companies/${handle}`);
    return res.data.company;
  }

  /** Get all companies with optional filters. */
  static async getCompanies(filters: CompanyFilters = {}): Promise<Company[]> {
    const res = await this.request<{ companies: Company[] }>(
      "companies",
      filters
    );
    return res.data.companies;
  }

  /** Get all jobs with optional filters. */
  static async getJobs(filters: JobFilters = {}): Promise<Job[]> {
    const res = await this.request<{ jobs: Job[] }>("jobs", filters);
    return res.data.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id: number): Promise<Job> {
    const res = await this.request<{ job: Job }>(`jobs/${id}`);
    return res.data.job;
  }

  /** Register a new user. */
  static async registerUser(userData: UserData): Promise<string> {
    const res = await this.request<{ token: string }>(
      "auth/register",
      userData,
      "post"
    );
    return res.data.token;
  }

  /** Login a user. */
  static async loginUser(userData: UserData): Promise<string> {
    const res = await this.request<{ token: string }>(
      "auth/token",
      userData,
      "post"
    );
    return res.data.token;
  }

  /** Get a user by username (admin only or same user). */
  static async getUser(username: string): Promise<User> {
    const res = await this.request<{ user: User }>(`users/${username}`);
    return res.data.user;
  }

  /** Update a user by username (admin only or same user). */
  static async updateUser(
    username: string,
    updates: Partial<User>
  ): Promise<User> {
    const res = await this.request<{ user: User }>(
      `users/${username}`,
      updates,
      "patch"
    );
    return res.data.user;
  }

  /** Apply to a job for a user. */
  static async applyToJob(
    username: string,
    jobData: JobApplicationData
  ): Promise<boolean> {
    const res = await this.request<{ applied: boolean }>(
      `users/${username}/jobs/${jobData.jobId}`,
      {},
      "post"
    );
    return res.data.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
