import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityService } from './city-service.interface.js';
import { DefaultCityService } from './city.service.js';
import { CityEntity, CityModel } from './city.entity.js';
import { Component } from '../../types/component.enum.js';


export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer.bind<CityService>(Component.CityService).to(DefaultCityService);
  cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);

  return cityContainer;
}
