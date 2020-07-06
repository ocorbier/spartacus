import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Budget, CostCenterService, EntitiesModel } from '@spartacus/core';
import {
  IconTestingModule,
  Table,
  TableTestingModule,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budget.service';

const mockCostCenterEntities: EntitiesModel<Budget> = {
  values: [
    {
      code: 'first',
      selected: true,
    },
    {
      code: 'second',
      selected: false,
    },
    {
      code: 'third',
      selected: true,
    },
  ],
};

class MockCostCenterService {
  getBudgets(): Observable<EntitiesModel<Budget>> {
    return of(mockCostCenterEntities);
  }
  assignBudget() {}
  unassignBudget() {}
}

describe('CostCenterAssignBudgetListService', () => {
  let service: CostCenterAssignBudgetListService;
  let costCenterService: CostCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconTestingModule, RouterTestingModule, TableTestingModule],
      providers: [
        CostCenterAssignBudgetListService,
        {
          provide: CostCenterService,
          useClass: MockCostCenterService,
        },
      ],
    });
    service = TestBed.inject(CostCenterAssignBudgetListService);
    costCenterService = TestBed.inject(CostCenterService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected budgets', () => {
    let result: Table<Budget>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('second');
    expect(result.data[2].code).toEqual('third');
  });

  it('should assign budget', () => {
    spyOn(costCenterService, 'assignBudget');
    service.toggleAssign('costCenterCode', 'budgetCode');
    expect(costCenterService.assignBudget).toHaveBeenCalledWith(
      'costCenterCode',
      'budgetCode'
    );
  });

  it('should unassign budget', () => {
    spyOn(costCenterService, 'unassignBudget');
    service.toggleAssign('costCenterCode', 'budgetCode', false);
    expect(costCenterService.unassignBudget).toHaveBeenCalledWith(
      'costCenterCode',
      'budgetCode'
    );
  });
});
