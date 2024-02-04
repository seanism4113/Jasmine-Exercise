describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
    expect(Object.keys(allServers)[0]).toEqual('server1');
  });

  it('should not update/add server with blank input on submitServerInfo', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('update the table on updateServertable()', function () {
    submitServerInfo();
    updateServerTable();

    let currentTdList = document.querySelectorAll('#serverTable tbody tr td');
    expect(currentTdList.length).toEqual(3);
    expect(currentTdList[0].innerHTML).toEqual('Alice');
    expect(currentTdList[1].innerHTML).toEqual('$0.00');
    expect(currentTdList[2].innerHTML).toEqual('X');
    
  });


  afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});
