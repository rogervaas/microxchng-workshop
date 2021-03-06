import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, BaseRequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AlertService} from 'ng-jhipster';

import {Book} from './book.model';
import {AccountService} from "../../shared/auth/account.service";
import {Customer} from "../customer/customer.model";
@Injectable()
export class BookService {

    private resourceUrl = 'bookservice/api/books';

    constructor(private http: Http) {
    }


    orderBook(book: Book, customer: Customer) {
        return this.http.post('orderservice/api/book-orders', {
            'status': 'NEW',
            'customerId': customer.id,
            'books': [{ "bookId": book.id }]
        });
    }

    create(book: Book): Observable<Book> {
        let copy: Book = Object.assign({}, book);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(book: Book): Observable<Book> {
        let copy: Book = Object.assign({}, book);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Book> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
