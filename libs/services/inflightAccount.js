'use strict';
const model = require('location-model');
const Promise = require('promise');
const BaseService = require('./baseService').BaseService;

class InflightAccountService extends BaseService {
  constructor(tenantedDb) {
    super();
    this.tenantedDb = tenantedDb;
  }

  isValidId(id) {
    return super.isValidId(this.tenantedDb.model.InflightAccount.repo, id);
  }

  validateResource(account) {
    let p = new Promise((resolve, reject) => {
      if (account.firstName && account.lastName && account.ttl) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    return p;
  }

  pageAccounts(query, limit, offset) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.InflightAccount.repo.page(query, limit, offset);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Inflight Repo in tenanted db'));
      });
      return p;
    }
  }

  saveAccount(account) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.InflightAccount.repo.save(account);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Inflight Repo in tenanted db'));
      });
      return p;
    }
  }

  updateAccount(accountId, account) {
    if (this.tenantedDb) {
      return this.tenantedDb.model.InflightAccount.repo.update(accountId, account);
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Inflight Repo in tenanted db'));
      });
      return p;
    }
  }

  findAccountById(id) {
    if (this.tenantedDb) {
      if (this.isValidId(id)) {
        return this.tenantedDb.model.InflightAccount.repo.findById(id);
      } else {
        return new Promise((resolve, reject) => {
          reject(new Error('Invalid Id'));
        });
      }
    } else {
      let p = new Promise((resolve, reject) => {
        reject(new Error('Missing Inflight Repo in tenanted db'));
      });
      return p;
    }
  }
}

module.exports.InflightAccountService = InflightAccountService;
