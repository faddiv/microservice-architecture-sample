import { FunctionComponent } from "react";

export const Contact: FunctionComponent = () => {
  return (
    <>
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">E-COMMERCE CONTACT</h1>
          <p className="lead text-muted mb-0">Contact Page build with Bootstrap 4 !</p>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <i className="fa fa-envelope"></i> Contact us.
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      aria-describedby="emailHelp"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" rows={6} required></textarea>
                  </div>
                  <div className="mx-auto">
                    <button type="submit" className="btn btn-primary text-right">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="card bg-light mb-3">
              <div className="card-header bg-success text-white text-uppercase">
                <i className="fa fa-home"></i> Address
              </div>
              <div className="card-body">
                <p>3 rue des Champs Elysées</p>
                <p>75008 PARIS</p>
                <p>France</p>
                <p>Email : email@example.com</p>
                <p>Tel. +33 12 56 11 51 84</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
