import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  describe("getHero", () => {
    it("should call get with correct URL", () => {
      // calling getHero function
      service.getHero(4).subscribe();

      // testing whether URL is correct
      const req = httpTestingController.expectOne("api/heroes/4");

      req.flush({ id: 4, name: "Hero1", strength: 100 });
      expect(req.request.method).toBe("GET");
      httpTestingController.verify();
    });
  });
});
