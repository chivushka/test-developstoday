import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@Get()
	findAll() {
		return this.countryService.getAvailableCountries();
	}

	@Get(':code/:name')
	findOne(@Param('code') code: string, @Param('name') name: string) {
		return this.countryService.getCountryInfo(code, name);
	}
}
