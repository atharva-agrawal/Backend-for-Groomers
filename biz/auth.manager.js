/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const AuthRepository = require("../repository/user-auth.repository");
const DuplicateError = require("../exception/duplicate-entity.error");
const NotFound = require("../exception/not-found.error");
const UnauthorizedError = require("../exception/unauthorize.error");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const randomize = require("randomatic");
const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");
const model = require("../constant/model");
const { USER_NOT_FOUND } = require("../constant/msg");
const { all } = require("../routes/user");

class AuthManager extends BaseManager {
  constructor() {
    super();
    this._authRepository = new AuthRepository();
  }

  async login(bodyParams, SCHEMA, model) {
    try{
      const validationResult = this.validate(SCHEMA, bodyParams);
      if(validationResult.valid) {
        const {phone_number, email_id, password: pwd} = bodyParams;
        const checkExist = await this._authRepository.findOne(
          model,
          phone_number,
          email_id
        );
        if(checkExist) {
          const customerData = await this._authRepository.findData(
            model,
            phone_number,
            email_id
          );
          const {customer_id, password, isActive} = customerData;
          const match = await bcrypt.compare(pwd, password);
          if (match) {
            //change key and salt rounds
            const accessToken = jwt.sign(
              {
                customer_id: customer_id,
                is_active: isActive,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: 1209600 }
            );
            return accessToken;
          }
          throw new UnauthorizedError(MSG.INVALID_CLIENT_CREDENTIALS);
        }
        throw new NotFound(MSG.USER_NOT_FOUND);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch(err) {
      throw err;
    }
  }

  async signUp(bodyParams, SCHEMA, model) {
    try {
      const validationResult = this.validate(SCHEMA, bodyParams);
      if (validationResult.valid) {
        let { phone_number, email_id, password } = bodyParams;

        const checkExist = await this._authRepository.findOne(
          model,
          phone_number,
          email_id
        );

        if (!checkExist) {
          bodyParams.customer_id = randomize("Aa0", 5);
          bodyParams.password = await bcrypt.hash(password, saltRounds);
          const saveCustomerData = await this._authRepository.saveOne(
            model,
            bodyParams
          );
          return saveCustomerData;
        }
        throw new DuplicateError(MSG.DUPLICATE_USER);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch (err) {
      throw err;
    }
  }

  async addService(bodyParams, model){
    try{
      const validationResult = this.validate(SCHEMA.SERVICES, bodyParams);
      if(validationResult.valid){
        bodyParams.service_id = randomize("Aa0", 4);
        const serviceAdded = await this._authRepository.saveOne(
          model, bodyParams
        );
        return serviceAdded;
      }
      throw new ValidationError(MSG.VALIDATION_ERROR)
    }catch (err){
      throw err;
    }
  }

  async deleteService(bodyParams, model){
    try{
      let { service_id } = bodyParams;
      const checkExist = await model.exists({service_id});
      if(checkExist){
        const deletedService = await this._authRepository.findOneAndDelete(
          model,
          bodyParams
        );
        return deletedService;
      }
      throw new NotFound(MSG.USER_NOT_FOUND);
    }catch (err){
      throw err;
    }
  }

  async findServices(model){
    try{
      const allServices = await this._authRepository.find(
        model
      );
      return allServices;
    }catch(err){
      throw err;
    }
  }

  async updateService(bodyParams, model){
    try{
      let { service_id } = bodyParams;
      const validationResult = this.validate(SCHEMA.SERVICES, bodyParams);
      if(validationResult.valid){
        const checkExist = await model.exists({service_id});
        if(checkExist){
          const updatedServices = await this._authRepository.findOneAndUpdate(
          model,
          bodyParams
          );
          return updatedServices;
        }
        throw new NotFound(MSG.USER_NOT_FOUND)
    }
    throw new ValidationError(MSG.VALIDATION_ERROR);
  }
      catch (err){
        throw err;
      }
     
  }
  async updateCompanyDetails(bodyParams, model){
    try{
      let { customer_id } = bodyParams;
      const validationResult = this.validate(SCHEMA.COMPANY_DETAILS, bodyParams);
      if(validationResult.valid){
        const checkExist = await model.exists({customer_id});
        if(checkExist){
          const updatedCompanyDetails = await this._authRepository.updateDetails(
            model,
            bodyParams
          );
          return updatedCompanyDetails;
        }
        throw  new NotFound(MSG.USER_NOT_FOUND);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR)
    } 
    catch (err){
      throw err;
    }
  }

  async findAllCompanyDetails(model){
    try{
      const allCompanyDetails = await this._authRepository.find(
        model
      );
      return allCompanyDetails;
    }
    catch (err){
      throw err;
    }
  }

  async addAppointment(bodyParams, model){
    try{
      const validationResult = this.validate(SCHEMA.APPOINTMENT, bodyParams);
      if(validationResult.valid){
        bodyParams.appointment_id = randomize("Aa0", 4);
        const appointmentAdded = await this._authRepository.saveOne(
          model, bodyParams
        );
        return appointmentAdded;
      }
      throw new ValidationError(MSG.VALIDATION_ERROR)
    }
    catch (err){
      throw err;
    }
  }

  async deleteAppointment(bodyParams, model){
    try{
      let { appointment_id } = bodyParams;
      const checkExist = await model.exists({appointment_id});
      if(checkExist){
        const deletedAppointment = await this._authRepository.deleteAppointments(
          model,
          bodyParams
        );
        return deletedAppointment;
      }
      throw new NotFound(MSG.USER_NOT_FOUND);
    }catch (err){
      throw err;
    }
  }

  async updateAppointment(bodyParams, model){
    try{
      let { appointment_id } = bodyParams;
      const validationResult = this.validate(SCHEMA.APPOINTMENT, bodyParams);
      if(validationResult.valid){
        const checkExist = await model.exists({appointment_id});
        if(checkExist){
          const updatedAppointment = await this._authRepository.updateAppointments(
            appointment_id,
            model,
            bodyParams
          );
          return updatedAppointment;
        }
        throw  new NotFound(MSG.USER_NOT_FOUND);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR)
    } 
    catch (err){
      throw err;
    }
  }

  async findAllAppointment(model){
    try{
      const allAppointment = await this._authRepository.find(
        model
      );
      return allAppointment;
    }
    catch (err){
      throw err;
    }
  }

  async findAllMerchant(model){
    try{
      const allMerchant = await this._authRepository.find(
        model
      );
      return allMerchant;
    }
    catch (err){
      throw err;
    }
  }
}

module.exports = AuthManager;
