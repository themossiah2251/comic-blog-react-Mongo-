import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StoreService {
  private readonly googlePlacesApiKey =
    'AIzaSyCKHXk1w7ZJTNLmZp7_IYZ0TI8FMofSBis';
  private readonly logger = new Logger(StoreService.name);

  async findStores(query: string): Promise<any> {
    this.logger.log(`Searching for stores with query: ${query}`);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query,
          type: 'book_store',
          key: this.googlePlacesApiKey,
        },
      },
    );
    return response.data;
  }
}
