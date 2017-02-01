// import the moongoose helper utilities
var request = require('supertest');
var should = require('should');
var app = require('./app');


describe('Teste das rotas', function () {
  //... previous test
  it('/', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/login', function (done) {
    request(app)
      .get('/login')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/authtoken', function (done) {
    request(app)
      .post('/authtoken')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/authtoken', function (done) {
    request(app)
      .post('/authtoken')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });



  it('/confirmacao', function (done) {
    request(app)
      .get('/confirmacao')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/chat', function (done) {
    request(app)
      .get('/chat')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/chamado/findall', function (done) {
    request(app)
      .get('/chamado/findall')
      .expect(302)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/chamado/findallBy/', function (done) {
    request(app)
      .post('/chamado/findallBy/')
      .expect(500)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/abrir/chamado/', function (done) {
    request(app)
      .post('/abrir/chamado/')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/insert', function (done) {
    request(app)
      .post('/insert')
      .expect(302)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/anunciante/findallAc', function (done) {
    request(app)
      .post('/anunciante/findallAc')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/anunciante/findallEs', function (done) {
    request(app)
      .post('/anunciante/findallEs')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/anunciante/findallEs', function (done) {
    request(app)
      .post('/anunciante/findallEs')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });

  it('/chamado/findallNew', function (done) {
    request(app)
      .post('/chamado/findallNew')
      .expect(200)
      .end(function (err, res) {
        if(err){console.log(err);}
        done();
      });
  });


});
