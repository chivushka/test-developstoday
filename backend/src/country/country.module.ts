import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
	controllers: [CountryController],
	imports: [HttpModule],
	providers: [CountryService],
})
export class CountryModule {}
