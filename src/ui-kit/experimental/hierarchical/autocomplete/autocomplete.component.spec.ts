/* tslint:disable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SamHierarchicalAutocompleteComponent, SamHierarchicalAutocompleteSettings } from './autocomplete.component';
import { FormsModule } from '@angular/forms';
import { HierarchicalTreeSelectedItemModel, TreeMode } from '../hierarchical-tree-selectedItem.model';
import { SamHiercarchicalServiceInterface, SearchByTextResult } from '../hierarchical-interface';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';


describe('SamHierarchicalAutocompleteComponent', () => {
  let component: SamHierarchicalAutocompleteComponent;
  let fixture: ComponentFixture<SamHierarchicalAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SamHierarchicalAutocompleteComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamHierarchicalAutocompleteComponent);
    component = fixture.componentInstance;
    component.service = new HierarchicalDataService();
    component.model = new HierarchicalTreeSelectedItemModel();
    component.settings = new SamHierarchicalAutocompleteSettings();
    component.settings.id = 'autoId';
    component.settings.keyField = 'id';
    component.model.treeMode = TreeMode.SINGLE;
    component.settings.valueProperty = 'name';
    component.settings.subValueProperty = 'subtext';
    component.settings.debounceTime = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have an input', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeDefined();
  });

  it('Should have an input id', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.attributes.id).toBe('autoId');
  });

  it('Should have empty results not exist', () => {
    fixture.detectChanges();
    expect(component.resultsListElement).toBe(undefined);
  });

  it('Should have empty results with invalid search', fakeAsync(() => {

    const event = {
      "key": "Space",
      "target": { "value": 'test search' }
    }
    component.onKeyup(event);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(1);
    const emptyItem = fixture.debugElement.query(By.css('.emptyResults'));
    expect(emptyItem).toBeTruthy();
  }));


  it('Should have results key press', fakeAsync(() => {
    const event = {
      "key": "d",
      "target": { "value": 'id' }
    }
    component.onKeyup(event);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[0]['highlighted']).toBeTruthy();
  }));

  it('Should have reuslts on focus', fakeAsync(() => {
    component.inputFocusHandler();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[0]['highlighted']).toBeTruthy();
  }));

  it('Select second item with down and up arrows', fakeAsync(() => {
    component.inputFocusHandler();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const downEvent = {
      "key": "Down",
      "target": { "value": 'id' }
    }
    component.onKeyup(downEvent);
    tick();
    fixture.detectChanges()
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[1]['highlighted']).toBeTruthy();
    const upEvent = {
      "key": "Up",
      "target": { "value": 'id' }
    }
    component.onKeyup(upEvent);
    tick();
    fixture.detectChanges();
    expect(component.results[0]['highlighted']).toBeTruthy();
  }));

  it('Should have delete have results', fakeAsync(() => {
    const event = {
      "key": "Delete",
      "target": { "value": 'id' }
    }
    component.onKeyup(event);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[0]['highlighted']).toBeTruthy();
  }));

  it('Should have results key press', fakeAsync(() => {
    const event = {
      "key": "d",
      "target": { "value": 'id' }
    }
    component.onKeyup(event);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[0]['highlighted']).toBeTruthy();
  }));

  it('Should have reuslts on focus', fakeAsync(() => {
    component.inputFocusHandler();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[0]['highlighted']).toBeTruthy();
  }));

  it('select item with enter key', fakeAsync(() => {
    component.inputFocusHandler();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    expect(component.results[0]['highlighted']).toBeTruthy();
    const event = {
      "key": "Enter",
      "target": { "value": 'id' }
    }
    component.onKeyup(event);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.model.getItems().length).toBe(1);
  }));


  it('hover over item is highlighted', fakeAsync(() => {
    component.inputFocusHandler();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    component.listItemHover(10);
    fixture.detectChanges();
    tick();
    expect(component.results[10]['highlighted']).toBeTruthy();
  }));


  it('clearInput and results closed', fakeAsync(() => {
    component.inputFocusHandler();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(list.nativeElement.children.length).toBe(11);
    component.clearInput();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const listAfter = fixture.debugElement.query(By.css('.autocomplete-result'));
    expect(listAfter).toBeFalsy();
  }));

});


export class HierarchicalDataService implements SamHiercarchicalServiceInterface {

  getDataByText(currentItems: number, searchValue?: string): Observable<SearchByTextResult> {
    let itemIncrease = 25;
    let data = Observable.of(SampleHierarchicalData);
    let itemsOb: Observable<Object[]>;
    if (searchValue) {
      itemsOb = data.map(items => items.filter(itm =>
        (itm.name.indexOf(searchValue) !== -1 ||
          itm.subtext.indexOf(searchValue) !== -1
        )));
    } else {
      itemsOb = data;
    }
    let items: object[];
    itemsOb.subscribe(
      (result) => {
        items = result;
      }
    );
    let totalItemCount = items.length;

    let maxSectionPosition = currentItems + itemIncrease;
    if (maxSectionPosition > totalItemCount) {
      maxSectionPosition = totalItemCount;
    }
    let subItemsitems = items.slice(currentItems, maxSectionPosition);

    let returnItem = {
      items: subItemsitems,
      totalItems: totalItemCount
    };
    return Observable.of(returnItem);
  }

  getHiercarchicalById(id?: string) {
    return null;
  }

}

export let SampleHierarchicalData = [
  { 'id': '1', 'parentId': null, 'name': 'Level 1', 'subtext': 'id 1', 'type': 'Level 1' },
  { 'id': '2', 'parentId': '1', 'name': 'Level 2', 'subtext': 'id 2', 'type': 'Level 2' },
  { 'id': '3', 'parentId': '2', 'name': 'Level 3', 'subtext': 'id 3', 'type': 'Level 3' },
  { 'id': '4', 'parentId': '3', 'name': 'Level 4', 'subtext': 'id 4', 'type': 'Level 4' },
  { 'id': '5', 'parentId': '4', 'name': 'Level 5', 'subtext': 'id 5', 'type': 'Level 5' },
  { 'id': '6', 'parentId': '5', 'name': 'Level 6', 'subtext': 'id 6', 'type': 'Level 6' },
  { 'id': '7', 'parentId': '6', 'name': 'Level 7', 'subtext': 'id 7', 'type': 'Level 7' },
  { 'id': '8', 'parentId': '5', 'name': 'Level 6', 'subtext': 'id 8', 'type': 'Level 6' },
  { 'id': '9', 'parentId': '8', 'name': 'Level 7', 'subtext': 'id 9', 'type': 'Level 7' },
  { 'id': '10', 'parentId': '8', 'name': 'Level 7', 'subtext': 'id 10', 'type': 'Level 7' },
  { 'id': '11', 'parentId': '5', 'name': 'Level 6', 'subtext': 'id 11', 'type': 'Level 6' }

];