import config from './config';


//api func
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    // const url = `http://localhost:3000` + path;

  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }



  //get user api
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }


  //post user api
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

// get a Course by id
  async getCourse(id) {
    const response = await this.api(`/course/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }



  //get all course 
  async getAllCourse() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //post Course 
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/course', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //put course
async updateCourse(id, course, emailAddress, password) {
  const response = await this.api(`/course/${id}`, 'PUT', course, true, { emailAddress, password });
  if (response.status === 204) {
    return [];
  }
  else if (response.status === 400) {
    return response.json().then(data => {
      return data.errors;
    });
  }
  else {
    throw new Error();
  }
}

//delete course
async deleteCourse(id, course, emailAddress, password) {
  const response = await this.api(`/course/${id}`, 'DELETE', course, true, { emailAddress, password });
  if (response.status === 204) {
    return [];
  }
  else if (response.status === 401) {
      return ['error'];
  }
  else {
    throw new Error();
  }
}
}
